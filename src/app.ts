import { DMimicService } from "./api";
import "dotenv/config";

(() => {
  const APIService = new DMimicService();

  APIService.Init();
  APIService.ConnectDB();
})();
