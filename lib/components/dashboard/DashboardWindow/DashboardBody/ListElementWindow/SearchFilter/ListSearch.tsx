import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion from framer-motion
import { fetchSearchResult } from '@/lib/services/dashboard';
import { SearchInput } from './SearchInput';
import { SearchIcon } from '@/lib/components/dashboard/svg'; // Ensure the path is correct
import { X } from 'lucide-react';
import { Folder, Note } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types';



export default function ListSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);   
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | string>(0);

  const hasText = searchTerm.length > 0;
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isInputFocused && contentRef.current) {
      // Calculate maxHeight based on the content's scrollHeight
      const contentHeight = contentRef.current.scrollHeight;
      setMaxHeight(contentHeight > 0 ? contentHeight : 'auto'); // Use 'auto' to let it expand based on content
    }
  }, [filteredFolders, filteredNotes, loading, isInputFocused]);



  const handleParentClick = () => {
    searchInputRef.current?.focus();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Show popover when the user starts typing
    setIsInputFocused(value.length > 0);

    if (value.length >= 1) {
      setLoading(true);
      const results = await fetchSearchResult(value);
      setFilteredFolders(results.folders);
      setFilteredNotes(results.notes);
      setLoading(false);
    } else {
      setFilteredFolders([]);
      setFilteredNotes([]);
    }
  };


  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    // Delay to check if the user clicked on the dropdown
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsInputFocused(false);
      }
    }, 0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsInputFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative p-3 rounded-lg flex flex-shrink-0 items-center gap-2 ${hasText ? "listview-filter-item-active" : "listview-filter-bg"}`}>
      <div className="flex items-center gap-2" onClick={handleParentClick}>
        <SearchIcon className='list-search-tab-icon ml-2' />
        <SearchInput
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxWidth="150px"
            placeholder="Search for Anything"
            className="flex-grow border-none bg-transparent text-base font-medium search-list focus:outline-none"
        />
        <div className="relative">
            {/* Reserve space for the close icon */}
            <div className="w-6 h-6  flex items-center justify-center relative"> {/* Fixed width for icon */}
                {hasText && (
                    <X
                        onClick={() => {
                            setSearchTerm("");
                            setIsInputFocused(false);
                        }}
                        className="list-search-tab-icon w-6 h-6 absolute right-1" // Absolute positioning
                    />
                )}
            </div>
        </div>
      </div>

      <AnimatePresence>
      
        {/* Animated dropdown using Framer Motion */}
        {isInputFocused && searchTerm.length > 0 && (
          <motion.div
              ref={contentRef}
              initial={{ opacity: 0, maxHeight: 0 }} // Start with maxHeight: 0
              animate={{ opacity: 1, maxHeight: maxHeight }} // Animate based on calculated maxHeight
              exit={{ opacity: 0, maxHeight: 0 }} // Shrink back to maxHeight: 0
              transition={{ duration: 0.3 }}
              className="absolute z-10 top-full mt-1 left-0 w-full bg-white shadow-lg rounded-lg overflow-hidden"
            >
            {/* Loading State */}
            {loading && (
              <motion.div
                key="loading" // Unique key for Framer Motion to identify this state
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-2 text-gray-500 flex items-center justify-center"
              >
                Loading...
              </motion.div>
            )}

            {/* Folders and Notes State */}
            {!loading && (
              <motion.div
                key="content" // Unique key for Framer Motion to identify this state
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-2"
              >
              
              {filteredNotes.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mt-2">Notes</div>
                    <div className="items-scrollbar"
                    >
                      {filteredNotes.slice(0, 4).map((note) => (
                        <div key={note.id} className="p-2 hover:bg-gray-100 transition-colors">
                          {note.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {filteredFolders.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mt-4">Folders</div>
                    <div className="items-scrollbar"
                    >
                      {filteredFolders.slice(0, 4).map((folder) => (
                        <div key={folder.id} className="p-2 hover:bg-gray-100 transition-colors">
                          {folder.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              

                {filteredFolders.length === 0 && filteredNotes.length === 0 && (
                  <div className=" text-gray-500 flex items-center justify-center">No match found</div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
        
      </AnimatePresence>

    </div>
  );
  
}
