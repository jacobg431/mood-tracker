export default function MoodOption(props) {
    const name = props.name;
    const emoji = props.emoji;
    const isSelected = props.isSelected;
    const onClick = props.onClick;

    return (
        <>
            <button
                type="button"
                className={`text-2xl px-4 py-2.5 rounded-xl border transition
          ${
              isSelected
                  ? 'bg-cyan-500 text-white border-cyan-600 shadow-sm'
                  : 'bg-white hover:bg-cyan-50 hover:border-cyan-200'
          }
          hover:-translate-y-0.5 active:translate-y-0
        `}
                onClick={onClick}
            >
                {emoji} {name}
            </button>
        </>
    );
}
