import { Settings } from "@/components/companys/internal/settings/settings";
import { currentManager } from "@/lib/auth";
import { notFound } from "next/navigation";



const SettingsPage = async () => {

    const user = await currentManager();

    if (!user) {
        notFound();
    }
    return (<Settings /> );
}
 
export default SettingsPage;