import React, { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { History, MoreVertical } from 'lucide-react';
import { recentNotesData } from '@/lib/storage/data/dashboard/DashboardWindow/DashboardBody/RecentElement/db';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const RecentElement = () => {
    const parentRef = useRef<HTMLDivElement>(null); // Ref for the parent container
    const [columnCount, setColumnCount] = useState(4);
    const [selectedTab, setSelectedTab] = useState(0);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const isCarousel = columnCount <= 2;

    const handleCarouselChange = () => {
        if (carouselApi) {
            const activeIndex = carouselApi.selectedScrollSnap(); // Get the current active slide index
            setSelectedTab(activeIndex);  // Update the selected tab
        }
    };
    

    useEffect(() => {
        const updateColumnCount = () => {
            if (parentRef.current) {
                const parentWidth = parentRef.current.offsetWidth; // Get parent width
                const cardWidth = 300; // Assume each card is approximately 300px wide
                const newColumnCount = Math.floor(parentWidth / cardWidth); // Calculate how many cards fit
                setColumnCount(Math.max(1, Math.min(newColumnCount, 9))); // Ensure at least 1 column and cap at 9
            }
        };

        updateColumnCount(); // Initial calculation

        // Add a resize observer to watch for changes in the parent size
        const resizeObserver = new ResizeObserver(updateColumnCount);
        if (parentRef.current) resizeObserver.observe(parentRef.current);

        return () => {
            if (parentRef.current) resizeObserver.unobserve(parentRef.current); // Cleanup observer
        };
    }, []);

    useEffect(() => {
        // Reset the selected tab when isCarousel changes
        setSelectedTab(0);
    }, [isCarousel]);

    const maxVisibleNotes = columnCount;

    // Activate carousel mode for 2 or fewer columns
    const slides = isCarousel
        ? Array.from({ length: Math.ceil(recentNotesData.length / columnCount) }, (_, index) =>
            recentNotesData.slice(index * columnCount, (index + 1) * columnCount)
          )
        : [];

    return (
        <div ref={parentRef} className="w-full h-auto p-6 theme-background rounded-lg flex-col justify-start items-start gap-4">
            <header className="flex justify-between items-center w-full mb-4">
                <h2 className="text-lg font-semibold text-theme-card-title">Recent Notes</h2>
            </header>
            {isCarousel ? (
                <Carousel className="w-full" orientation = "horizontal" setApi={setCarouselApi} onChange={handleCarouselChange} >
                    <CarouselContent className='ml-0'>
                        {slides.map((slide, slideIndex) => (
                            <CarouselItem key={slideIndex} className='pl-0'>
                                <div
                                    className="grid p-4 gap-6 auto-rows-[1fr]"
                                    style={{
                                        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, // Dynamically set columns
                                    }}
                                >
                                    {slide.map((note) => (
                                        <Card key={note.id} className="group flex flex-col theme-card-background theme-card-border theme-card-hover-shadow">
                                            <CardHeader>
                                                <img className="w-full h-full rounded-lg object-cover" src={note.image} alt={note.title} />
                                            </CardHeader>
                                            <CardContent className="pb-4 pl-6 pr-6 pt-0">
                                                <CardTitle className="text-lg theme-card-title" >{note.title}</CardTitle>
                                                <div className="flex justify-between mt-1 items-center text-base">
                                                    <div className="theme-card-text flex items-center space-x-2">
                                                        <History className="w-4 h-4" />
                                                        <span>{note.lastUpdated}</span>
                                                    </div>
                                                    <div className="p-1 rounded-lg theme-icon-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <MoreVertical className="w-6 h-6 theme-icon" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-4 space-x-2">
                        {slides.map((_, index) => (
                            <button
                            key={index}
                            className={`w-4 h-4 rounded-full ${selectedTab === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => {
                                setSelectedTab(index);
                                carouselApi?.scrollTo(index); // Control the carousel slide
                            }}
                            />
                        ))}
                    </div>
                </Carousel>
            ) : (
                <main
                    className={`grid gap-6 auto-rows-[1fr]`}
                    style={{
                        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, // Dynamically set columns
                    }}
                >
                    {recentNotesData.slice(0, maxVisibleNotes).map((note) => (
                        <Card key={note.id} className="group flex flex-col theme-card-background theme-card-border theme-card-hover-shadow">
                            <CardHeader>
                                <img className="w-full h-full rounded-lg object-cover" src={note.image} alt={note.title} />
                            </CardHeader>
                            <CardContent className="pb-4 pl-6 pr-6 pt-0">
                                <CardTitle className="text-lg theme-card-title" >{note.title}</CardTitle>
                                <div className="flex justify-between mt-1 items-center text-base">
                                    <div className="theme-card-text flex items-center space-x-2">
                                        <History className="w-4 h-4" />
                                        <span>{note.lastUpdated}</span>
                                    </div>
                                    <div className="p-1 rounded-lg theme-icon-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <MoreVertical className="w-6 h-6 theme-icon" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            )}
        </div>
    );
};

export default RecentElement;
