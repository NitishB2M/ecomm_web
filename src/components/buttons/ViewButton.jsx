import Link from "next/link";

const ViewButton = (props) => {
  return (
    <Link href={props.link}
      className="px-8 py-3 border border-primary transition-500 rounded-sm bg-surface2 hover:border-info hover:bg-surface hover:text-primary font-medium dark:bg-dark-background/70 dark:hover:bg-dark-surface dark:hover:text-dark-primary"
    >
      {props.text}
    </Link>
  );
}

export default ViewButton;