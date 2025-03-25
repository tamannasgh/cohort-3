import Button from "./components/Button";
import CopyIcon from "./icons/CopyIcon";
import DeleteIcon from "./icons/DeleteIcon";
import DocumentIcon from "./icons/DocumentIcon";
import LinkIcon from "./icons/LinkIcon";
import PlusIcon from "./icons/plusIcon";
import ShareIcon from "./icons/ShareIcon";
import TagIcon from "./icons/TagIocn";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YoutubeIcon";

function App() {
	return (
		<>
			<div className="bg-[#F9FAFB] p-5 text-black">
        <TwitterIcon />
        <YoutubeIcon />
        <DocumentIcon />
        <LinkIcon />
        <PlusIcon />
        <ShareIcon />
        <TagIcon />
        <DeleteIcon />
        <CopyIcon />

				<Button
					text={"Yoo"}
					varient="primary"
				/>
				<Button
					text={"Yoo2"}
					varient="secondary"
				/>
			</div>
		</>
	);
}

export default App;
