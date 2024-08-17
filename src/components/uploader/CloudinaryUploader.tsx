import { createContext, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UploadWidgetProps, UwConfig } from "@/types";

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: UwConfig,
        callback: (error: Error | null, result: any) => void
      ) => {
        open: () => void;
      };
    };
  }
}

const CloudinaryScriptContext = createContext({ loaded: false });

function UploadWidget({ uwConfig, setPublicId, onUpload }: UploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const uwScript = document.getElementById("uw") as HTMLScriptElement;
    if (!uwScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const initializeCloudinaryWidget = useCallback(() => {
    if (loaded && window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: Error | null, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            onUpload(result.info.secure_url);
            setPublicId(result.info.public_id);
            toast({
              title: "Upload Successful",
              description: `File uploaded: ${result.info.original_filename}`,
            });
          }
        }
      );
      myWidget.open();
    } else {
      console.error("Cloudinary script not loaded");
      toast({
        title: "Error",
        description:
          "Upload widget couldn't be initialized. Please try again later.",
        variant: "destructive",
      });
    }
  }, [loaded, uwConfig, onUpload, setPublicId, toast]);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        id="upload_widget"
        onClick={initializeCloudinaryWidget}
        disabled={!loaded}
      >
        {loaded ? "Upload photos and videos" : "Loading..."}
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
