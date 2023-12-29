import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { APP_SCREEN, RootParamList } from "@type/navigation";

export type Message = {
  id: string;
  timestamp: number;
  userId: string;
  displayName: string;
  photoURL: string;
  message: string;
};

export type MatchDetails = {
  id: string;
  users: {
    [key: string]: {
      photoURL: string;
    };
  };
};
export type MessageScreenRouteProp = RouteProp<
  RootParamList,
  APP_SCREEN.MESSAGE
>;
export type MessageScreenNavigationProp = StackNavigationProp<
  RootParamList,
  APP_SCREEN.MESSAGE
>;

export type MessageScreenProps = {
  route: MessageScreenRouteProp;
  navigation: MessageScreenNavigationProp;
};
export type CardData = {
  id: string;
  displayName: string;
  job: string;
  age: number;
  uri: any;
  photoURL: string;
};
export type HeaderProps = {
  title: string;
};
export type MessageProps = {
  message: {
    photoURL: string;
    message: string;
  };
};
