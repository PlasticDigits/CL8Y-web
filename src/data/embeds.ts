// Centralized embed configuration for third-party widgets (e.g., X/Twitter)

export type XTimelineEmbedConfig = {
  profileUrl: string; // e.g., https://twitter.com/CeramicToken or https://x.com/ceramictoken
  anchorText: string; // Accessible label for the timeline link
  widgetScriptSrc: string; // https://platform.twitter.com/widgets.js
};

export const xTimelineEmbed: XTimelineEmbedConfig = {
  profileUrl: "https://x.com/CeramicToken?ref_src=twsrc%5Etfw",
  anchorText: "Tweets by CeramicToken",
  widgetScriptSrc: "https://platform.twitter.com/widgets.js",
};

export type { XTimelineEmbedConfig as Cl8yXTimelineEmbedConfig };
