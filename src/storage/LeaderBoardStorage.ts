import {IScoreBoard} from "../components/Scoreboard";

class LeaderBoardStorage {

    private static leaderBoardMap = new Map<String, IScoreBoard[]>();
    constructor(storageName: string = "leaderBoardStorage", initialValue: IScoreBoard[] = []) {
            if(! LeaderBoardStorage.leaderBoardMap.has(storageName)) {
                LeaderBoardStorage.leaderBoardMap.set(storageName, initialValue);
            }
    }

    getData(): IScoreBoard[] {
          return LeaderBoardStorage.leaderBoardMap.get("leaderBoardStorage") || [];

    }

    updateData(turnParameters: IScoreBoard): void {
          var leaderBoardArr = LeaderBoardStorage.leaderBoardMap.get("leaderBoardStorage") || [];
          leaderBoardArr.splice(0,0,turnParameters);
          LeaderBoardStorage.leaderBoardMap.set("leaderBoardStorage", leaderBoardArr);
    }

}

export default LeaderBoardStorage;