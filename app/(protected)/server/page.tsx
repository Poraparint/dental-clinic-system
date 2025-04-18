
import { currentManager } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";


const ServerPage = async () => {
    const manager = await currentManager();

  return (<UserInfo label="Server component" manager={manager}/>);
};

export default ServerPage;
