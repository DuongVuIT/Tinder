export enum APP_SCREEN {
  LOGIN = "LOGIN",
  HOME = "HOME",
  MESSAGE = "MESSAGE",
  MODAL = "MODAL",
  CHAT = "CHAT",
  MATCH = "MATCH",
}
export type RootParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.MESSAGE]: {
    matchDetails: any;
  };
  [APP_SCREEN.MODAL]: undefined;
  [APP_SCREEN.MATCH]: {
    loggedInProfile: any;
    userSwiped: any;
  };
  [APP_SCREEN.CHAT]: undefined;
};
