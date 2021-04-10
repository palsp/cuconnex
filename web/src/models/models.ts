// Auth Services

export interface IUserSignup {
  email: string;
  password: string;
  id: string;
}

export interface IResultSigninSignup {
  email: string;
  id: string;
}

export interface IUserSignin {
  email: string;
  password: string;
}

// User Services

export interface IFetchUserData {
  id: string;
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
}

export interface ICreateUserData {
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
}
//events
export interface IFetchEventsData {
  events: {
    id: number;
    eventName: string;
    bio: string;
    location: string;
    startDate: {
      date: {
        month: number;
        day: number;
        year: number;
      };
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
    endDate: {
      date: {
        month: number;
        day: number;
        year: number;
      };
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
  }[];
}
export interface IFetchEventsDataResult {
  events: {
    id: number;
    eventName: string;
    bio: string;
    location: string;
    startDate: {
      date: {
        month: number;
        day: number;
        year: number;
      };
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
    endDate: {
      date: {
        month: number;
        day: number;
        year: number;
      };
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
  }[];
}
export interface ICreateEventsData {
  events: {
    id: number;
    eventName: string;
    bio: string;
    location: string;
    startDate: {
      date: {
        month: number;
        day: number;
        year: number;
      };
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
    endDate: {
      date: {
        month: number;
        day: number;
        year: number;
      };
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
  }[];
}
