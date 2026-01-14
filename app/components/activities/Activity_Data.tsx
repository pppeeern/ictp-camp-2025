import { ReactElement } from "react";
import { compType } from "../competitions/Comp_Data";

export const activityData: compType[] = [
    {
        name: "กิจกรรมฐาน",
        tag: "Activity",
        logo: "/competitions/Activity.jpg",
        des: `กิจกรรมฐาน`,
        req: (
            <p>
                กิจกรรมรวม
            </p>
        ),
        min: 0,
        max: 0,
        team_type: "single",
        date: "",
    },
];
