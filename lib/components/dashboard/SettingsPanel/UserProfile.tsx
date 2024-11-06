// lib\components\dashboard\SettingsPanel\UserProfile.tsx

import { Edit3, LogOut, X } from 'lucide-react';
import { useAppStore } from '../../../storage/state/useAppStore';

const UserProfile = () => {
  const { setSettingsTab, closeSettings } = useAppStore();

  return (
    <div className="PopupUserprofileSettings w-full h-full p-4  rounded-tr-2xl rounded-br-2xl flex-col justify-start items-start gap-4 inline-flex">
      {/* Profile Settings Header */}
      <div className="self-stretch p-1 border-b border-neutral-400 flex-col justify-center items-start gap-2 flex">
        <div className="Heading self-stretch justify-between items-start inline-flex">
          <div className="Title flex-col justify-start items-start gap-1 inline-flex">
            <div className="ProfileSettings text-center text-white text-lg font-medium  tracking-tight">
              Profile Settings
            </div>
          </div>
          <div
            className="Close w-6 h-6 p-1 justify-center items-center flex cursor-pointer"
            onClick={() => {
              closeSettings(); // Close settings modal
              setSettingsTab('appearance'); // Optionally reset tab to 'appearance'
            }}
          >
            <X className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div className="Action self-stretch h-6 justify-start items-center gap-4 inline-flex">
          <div className="YourPersonalProfileSettings grow shrink basis-0 text-neutral-400 text-sm font-normal  leading-tight tracking-tight">
            Your personal profile settings
          </div>
        </div>
      </div>

      {/* My Profile Section */}
      <div className="MyProfileCard self-stretch h-auto p-2 flex-col justify-center items-start flex">
        <div className="Description self-stretch h-12 flex-col justify-start items-start gap-1 flex">
          <div className="MyProfile text-center text-white text-base font-medium  leading-normal tracking-tight">
            My Profile
          </div>
          <div className="YourAccountProfileWillBeDisplayedToEveryone self-stretch text-neutral-400 text-sm font-normal  leading-tight tracking-tight">
            Your account profile will be displayed to everyone
          </div>
        </div>
        <div className="Image self-stretch p-1 justify-start items-center gap-6 inline-flex">
          <div className="Avatar w-16 h-16 rounded-full relative">
            {/* Avatar Image */}
            <img
              className="w-full h-full rounded-full object-cover"
              src="https://via.placeholder.com/62x62"
              alt="User Avatar"
            />
            
            {/* Pencil Icon Overlay */}
            <div className="Pencil w-5 h-5 bg-black rounded-full absolute bottom-1 right-1 flex items-center justify-center z-10">
              <Edit3 className="w-3 h-3 text-white" /> {/* Pencil icon from Lucide */}
            </div>
          </div>


          <div className="Frame49 grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
            <div className="DisplayName text-center text-zinc-400 text-sm font-normal  leading-tight tracking-tight">
              Display Name
            </div>
            <div className="Frame53 self-stretch px-2 py-1 bg-zinc-600 rounded border border-zinc-500 justify-start items-center gap-2 inline-flex">
              <div className="Jack text-center text-neutral-50 text-sm font-normal  leading-tight tracking-tight">
                Jack
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className="EmailCard self-stretch h-auto p-2 flex-col justify-center items-start flex">
        <div className="Title flex-col justify-start items-start gap-1 flex">
          <div className="Email text-center text-white text-base font-medium  leading-normal tracking-tight">
            Email
          </div>
        </div>
        <div className="Action self-stretch justify-between items-center inline-flex">
          <div className="JackGmailCom grow shrink basis-0 text-neutral-400 text-sm font-normal  leading-tight tracking-tight">
            jack@gmail.com
          </div>
          <button className="p-2 bg-black/50 rounded-md border border-zinc-400/50 flex items-center gap-2">
            <span className="text-neutral-50 text-xs font-normal leading-none tracking-tight">
              Change Email
            </span>
          </button>

        </div>
      </div>

      {/* Password Section */}
      <div className="PasswordCard self-stretch h-auto p-2 flex-col justify-center items-start flex">
        <div className="Title flex-col justify-start items-start gap-1 flex">
          <div className="Password text-center text-white text-base font-medium  leading-normal tracking-tight">
            Password
          </div>
        </div>
        <div className="Action self-stretch justify-between items-center inline-flex">
          <div className="SetAPasswordToSignInToYourAccount grow shrink basis-0 text-neutral-400 text-sm font-normal  leading-tight tracking-tight">
            Set a Password to sign in to your account
          </div>
          <button className="p-2 bg-black/50 rounded-md border border-zinc-400/50 flex items-center gap-2">
            <span className="text-neutral-50 text-xs font-normal leading-none tracking-tight">
              Change Password
            </span>
          </button>
        </div>
      </div>

      {/* Sign Out Section */}
      <div className="SignOutCard self-stretch h-auto p-2 flex-col justify-center items-start flex">
        <div className="Title flex-col justify-start items-start gap-1 flex">
          <div className="SignOut text-center text-white text-base font-medium  leading-normal tracking-tight">
            Sign Out
          </div>
        </div>
        <div className="Action self-stretch justify-between items-center inline-flex">
          <div className="SecurelySignOutOfCurrentDevice grow shrink basis-0 text-neutral-400 text-sm font-normal  leading-tight tracking-tight">
            Securely sign out of current device
          </div>
          <button className="p-2 bg-black/50 rounded-md border border-zinc-400/50 flex items-center gap-2">
            <LogOut className="w-4 h-4 text-neutral-50" /> {/* Lucide Logout Icon */}
            <span className="text-neutral-50 text-xs font-normal leading-none tracking-tight">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
