const ViewButton = (props) => {
    return (
        <div className="text-center mt-4">
          <a
            href={props.link}
            className="inline-block px-8 py-3 mt-4 border border-black transition-all duration-700 ease-in-out rounded-sm hover:bg-black hover:text-white hover:shadow-custom text-sm font-medium dark:bg-surface/70 dark:hover:bg-surface dark:hover:text-black dark:border-white"
          >
            {props.text}
          </a>
        </div>
    );
}

export default ViewButton;