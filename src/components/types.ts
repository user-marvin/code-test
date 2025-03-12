export type LaunchDetails = {
  crew: null | any; // `any` because the crew is null in this case, but it could have other structures.
  details: string;
  flight_number: number;
  is_tentative: boolean;
  launch_date_local: string; // ISO 8601 format string
  launch_date_unix: number; // Unix timestamp
  launch_date_utc: string; // ISO 8601 format string
  launch_failure_details: {
    time: number;
    altitude: number | null;
    reason: string;
  };
  launch_site: {
    site_id: string;
    site_name: string;
    site_name_long: string;
  };
  launch_success: boolean;
  launch_window: number;
  launch_year: string;
  links: {
    mission_patch: string;
    mission_patch_small: string;
    reddit_campaign: string | null;
    reddit_launch: string | null;
    reddit_recovery: string | null;
    article_link: string;
    [key: string]: string | null;
  };
  mission_id: string[];
  mission_name: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: any; // You can define the structure of first_stage here
    second_stage: any; // You can define the structure of second_stage here
  };
  ships: any[]; // You can define the ship objects in more detail if needed
  static_fire_date_unix: number; // Unix timestamp
  static_fire_date_utc: string; // ISO 8601 format string
  tbd: boolean;
  telemetry: {
    flight_club: string | null;
  };
  tentative_max_precision: string;
  timeline: {
    webcast_liftoff: number;
  };
  upcoming: boolean;
};
