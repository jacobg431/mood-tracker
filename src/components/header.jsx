import { LogOut, User } from 'lucide-react';

export default function Header(props) {
    function onLogout() {}
    const title = 'Welcome To Mood Tracker';
    const username = props.userName;
    const onSetUserName = props.onSetUserName;

    return (
        <header className="w-full border-b bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Left: Logo / Title */}
                <div className="text-xl font-semibold tracking-tight text-gray-900">{title}</div>

                {/* Right: User info + Logout */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{username}</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
