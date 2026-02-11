export default function MoodOption(props) {
    const name = props.name;
    const emoji = props.emoji;

    return (
        <>
            <button className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                {emoji} {name}
            </button>
        </>
    );
}
