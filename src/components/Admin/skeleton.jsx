import { cls } from "../../utils/cls";
function Skeleton({ className }) {
    return <div className={cls("animate-pulse bg-slate-200 rounded-xl", className)} />;
}

export default Skeleton