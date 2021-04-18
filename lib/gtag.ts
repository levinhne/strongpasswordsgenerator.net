export const GA_TRACKING_ID = "G-SZM2QWC7T5";

type GTagEvent = {
    eventAction: string;
    eventCategory: string;
    eventLabel: string;
    eventValue?: number;
    nonInteraction?:boolean;
};

export const pageview = (url: URL): void => {
    if (typeof(window.gtag) != "undefined") {
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ eventAction, eventCategory, eventLabel, eventValue, nonInteraction }: GTagEvent): void => {
    if (typeof(window.gtag) != "undefined") {
        let a = window.gtag("event", eventAction, {
            event_category: eventCategory,
            event_label: eventLabel,
            non_interaction: nonInteraction,
            eventValue,
        });
        console.log("vvv", a);
    }
};