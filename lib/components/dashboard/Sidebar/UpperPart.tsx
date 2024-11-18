// lib\components\dashboard\Sidebar\UpperPart.tsx



import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { BadgeCheck, CreditCard, Bell, ArrowUpRight, ChevronRight } from "lucide-react";
import Logo from "../svg/LogoIcon";


import { AppData, User, List } from "@/lib/Interface/dashboard/Sidebar/UpperPart/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";



import CustomCollapsible from "./CustomCollapsible";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FavoriteIcon, MoreIcon, NoteIcon } from "../svg";
import FolderIcon from "../svg/FolderIcon";
import { MoreOptionPanel } from "./MoreOptionPanel";

// Main component
export default function UpperPart(mydata: AppData) {
  

  // Destructure mydata
  const { appName, user, list }: AppData = mydata;

  return (
    <div className="flex flex-col space-y-2 pt-2 pl-2 pr-2">
      {/* App Logo and Name with Current Plan */}
      <LogoHeader appName={appName} user={user} />

      {/* User Drawer */}
      <UserPopover user={user}  />

      {/* Content for Notes */}
      <Content list={list} />
    </div>
  );
}

// LogoHeader Component
const LogoHeader = ({ appName, user }: { appName: string; user: User }) => {
  return (
    <div className="flex items-center gap-1 pl-2 space-x-2 ">
      <Logo width="20" height="20" />
      <div className="flex flex-col">
        <div className={`text-sm font-semibold upperpart_title`}>{appName}</div>
        <div className={`text-xs font-semibold upperpart_text`}>{user.plan} Plan</div>
      </div>
    </div>
  );
};





// UserPopover Component
const UserPopover = ({ user }: { user: User }) => {
  const avatarUrl = user.avatar || '/assets/images/avatar.png';
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild className="userPopover">
          <div className="flex items-center cursor-pointer">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback className="user-avatar">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-left flex items-center">
              <span className="block text-sm font-semibold upperpart_title">Hi, {user.name}</span>
              <ChevronRight width={"16"} strokeWidth="3" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="z-50 p-4 more-option-panel w-auto">
          <PopoverArrow />
          <div className="space-y-2 ">
            <span className="block text-sm text-center ">{user.email}</span> 
            <hr />
            <Button 
              type="button" 
              className="flex items-center justify-between"
            >
              <span className="flex text-sm items-center">
                <ArrowUpRight width="20" className="mr-2" />
                Upgrade to Pro
              </span>
            </Button>
           
            <div className="flex flex-col gap-0">
              <div className="popover-option flex items-center text-sm space-x-2 cursor-pointer">
                <BadgeCheck width={"20"} />
                <span>Account</span>
              </div>
              <div className="popover-option flex items-center text-sm space-x-2 cursor-pointer">
                <CreditCard width={"20"} />
                <span>Billing</span>
              </div>
              <div className="popover-option flex items-center text-sm space-x-2 cursor-pointer">
                <Bell width={"20"} />
                <span>Notifications</span>
              </div>
            </div>

          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};






const Content = ({ list }: { list: List}) => {

  const recentNotes = list?.recent || [];
  const favoriteFolder = list?.favorite || [];

  return (
      <div className="space-y-2 mt-2">
          {/* Recent Notes */}
          <CustomCollapsible defaultOpen={true} trigger={<span className="accordion-title text-center text-base font-semibold ">Recent</span>}>
          {recentNotes.length > 0 ? (              
              recentNotes.map((note) => (
                  <div key={note.id} className="accordion-content rounded-md flex items-center justify-between cursor-pointer ">
                      
                      <div className="flex items-center space-x-2 pl-1">
                          <NoteIcon />
                          <span>{note.title}</span>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="more-icon rounded-lg">
                            <MoreIcon className="more-icon" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 more-option-panel w-auto border">
                          <MoreOptionPanel type="note" />
                        </PopoverContent>
                      </Popover>
                  </div>
              ))
            ) : (
              // Display ShadCN UI Card when no recent notes
              <Card className="w-full  ">
                  <CardHeader className="text-center p-4 items-center">
                      <div className="flex justify-center items-center h-10 w-10 rounded-full bg-gray-200">
                          <NoteIcon className="accordion-card-text"/>
                      </div>
                      <CardTitle className="accordion-card-text" >No Recent Notes</CardTitle>
                  </CardHeader>
                  
                  <CardFooter className="flex pb-4 justify-center">
                      <Button onClick={() => {/* handle 'Take Notes' action */}}>Take Notes</Button>
                  </CardFooter>
              </Card>
          )}
          </CustomCollapsible>

          {/* Favorite Notes */}
          <CustomCollapsible defaultOpen={false} trigger={<span className="accordion-title text-center text-base font-semibold">Favorites</span>}>
          {favoriteFolder.length > 0 ? (  
              favoriteFolder.map((folder) => (
                  <div key={folder.id} className="accordion-content rounded-md flex items-center justify-between cursor-pointer ">
                       <div className="flex items-center space-x-2 pl-1">
                          <FolderIcon width={18}/>
                          <span>{folder.name}</span>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="more-icon rounded-lg">
                              <MoreIcon className="more-icon" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className=" w-auto p-2 more-option-panel border">
                            <MoreOptionPanel type="folder" />
                          </PopoverContent>
                      </Popover>
                  </div>
              ))
            ):(
              // Display ShadCN UI Card when no favorite notes
              
                <Card className="w-full ">
                    <CardHeader className="text-center p-4  items-center">
                        <div className="flex justify-center items-center h-10 w-10 rounded-full bg-gray-200">
                            <FavoriteIcon variant="selected" />
                        </div>
                        <CardTitle className="p-2 accordion-card-text">Empty Favorites</CardTitle>
                    </CardHeader>
                                        
                </Card>
           
          )}

          </CustomCollapsible>
      </div>
  );
};

