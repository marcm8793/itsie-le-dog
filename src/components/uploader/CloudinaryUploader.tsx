import { createContext, useSyncExternalStore, useCallback } from "react";
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

const UW_SCRIPT_ID = "uw";
const UW_SCRIPT_SRC = "https://upload-widget.cloudinary.com/global/all.js";

/**
 * Injects the Cloudinary widget script (once) and notifies React when it has
 * finished evaluating. Reading `window.cloudinary` rather than tracking our own
 * flag means a script tag that exists but hasn't loaded yet still reports as
 * not-ready, instead of enabling the button too early.
 */
function subscribeToUploadWidget(onStoreChange: () => void) {
  let script = document.getElementById(
    UW_SCRIPT_ID
  ) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.async = true;
    script.id = UW_SCRIPT_ID;
    script.src = UW_SCRIPT_SRC;
    document.body.appendChild(script);
  }

  script.addEventListener("load", onStoreChange);
  return () => script?.removeEventListener("load", onStoreChange);
}

const getUploadWidgetSnapshot = () => Boolean(window.cloudinary);
const getUploadWidgetServerSnapshot = () => false;

function UploadWidget({ uwConfig, setPublicId, onUpload }: UploadWidgetProps) {
  const loaded = useSyncExternalStore(
    subscribeToUploadWidget,
    getUploadWidgetSnapshot,
    getUploadWidgetServerSnapshot
  );
  const { toast } = useToast();

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
