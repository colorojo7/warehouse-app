import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';

export const navData = [
{
    id: 0,
    icon: <HomeIcon/>,
    text: "Home",
    route: "/"
},
{
    id: 1,
    icon: <FolderIcon/>,
    text: "Jobs",
    route: "jobList"
},
{
    id: 2,
    icon: <DescriptionIcon/>,
    text: "Folios",
    route: "folioList"
}
]