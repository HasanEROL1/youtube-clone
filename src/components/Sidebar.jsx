import { Link } from "react-router-dom";
import { categories } from "../utils/constant"; // yolunu kendi projenle eşleştir

const Sidebar = () => {
    return (
        <aside className="bg-zinc-900 text-white p-4 w-64 h-screen">
            {categories.map((item, index) => (
                <Link
                    to={item.path}
                    key={index}
                    className="flex items-center gap-3 mb-4 hover:bg-zinc-700 p-2 rounded"
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                </Link>
            ))}
        </aside>
    );
};

export default Sidebar;
