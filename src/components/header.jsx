import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router";

export default function Header(props) {
    const title = "Mood Tracker";
    const username = props.userName;
    const onSetUserData = props.onSetUserData;
    const navigate = useNavigate();

    function onSelectorClick() {
        navigate("/selector");
    }

    function onProfileClick() {
        navigate("/profile");
    }

    function onLogoutClick() {
        navigate("/login");
        onSetUserData({
            userId: -1,
            userName: "",
            affirmations: [],
        });
    }

    const headerClass =
        "w-full border-b border-white/20 shadow-[0_10px_35px_-20px_rgba(0,0,0,0.45)]";

    const bgClass =
        "relative overflow-hidden bg-gradient-to-r from-fuchsia-600 via-sky-500 to-emerald-500";

    const overlayClass =
        "absolute inset-0 bg-white/10 backdrop-blur-[2px]";

    const containerClass =
        "relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6";

    const titleClass =
        "text-3xl sm:text-4xl font-extrabold tracking-tight text-white/95 drop-shadow";

    const actionsClass =
        "flex items-center gap-3";

    const iconClass =
        "h-5 w-5";


    const btnBase =
        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-base font-semibold " +
        "transition active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30";

    const btnGlass =
        btnBase +
        " bg-white/15 text-white border border-white/25 backdrop-blur-md shadow-sm hover:bg-white/20";

    const btnPrimary =
        btnBase +
        " bg-white text-slate-900 border border-white/60 shadow-md hover:bg-white/90";

    const btnLogout =
        btnBase +
        " bg-slate-900/70 text-white border border-white/10 shadow-md hover:bg-slate-900/85";


    return (
        <header className={headerClass}>
            <div className={bgClass}>
                <div className={overlayClass} />

                <div className={containerClass}>
                    <div className={titleClass}>{title}</div>

                    <div className={actionsClass}>
                        {username && (
                            <>
                                <button onClick={onSelectorClick} className={btnGlass}>
                                    Mood Selector
                                </button>

                                <button onClick={onProfileClick} className={btnPrimary}>
                                    <User className={iconClass} />
                                    {username}
                                </button>

                                <button onClick={onLogoutClick} className={btnLogout}>
                                    <LogOut className={iconClass} />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
