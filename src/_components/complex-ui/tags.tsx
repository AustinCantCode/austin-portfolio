export default function Tags(props: { data }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {props.data.map((item, id) => (
        <span
          key={id}
          className="min-w-fit bg-black/15 rounded px-2 py-1 text-xs"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
