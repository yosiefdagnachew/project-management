import React, { useEffect } from "react";

const BotpressChatbot = () => {
  useEffect(() => {
    const botpressScript = document.createElement("script");
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    const configScript = document.createElement("script");
    configScript.src =
      "https://mediafiles.botpress.cloud/48e797b0-bbe2-4e6e-bec6-38611c57839a/webchat/config.js";
    configScript.defer = true;
    document.body.appendChild(configScript);

    return () => {
      // Cleanup on unmount (optional)
      document.body.removeChild(botpressScript);
      document.body.removeChild(configScript);
    };
  }, []);

  return <div>{/* You can add any other components or content here */}</div>;
};

export default BotpressChatbot;
