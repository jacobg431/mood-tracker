export default function MoodOption(props) {
    const name = props.name;
    const emoji = props.emoji;
    const isSelected = props.isSelected;
    const onClick = props.onClick;

    return (
        <>
            <button
                type="button"
                className={`text-3xl p-4 rounded-lg border transition
                    ${isSelected ? 'bg-blue-500 text-white border-blue-600' : 'bg-white hover:bg-gray-100'}
                `}
                onClick={onClick}
            >
                {emoji} {name}
            </button>
        </>
    );
}
