"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import { Photo } from "@/types";
import Image from "next/image";

const DogPhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const fetchPhotosFromCloudinary = useCallback(async () => {
    try {
      console.log("Fetching photos...");
      const response = await fetch("/api/photos");
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      const fetchedPhotos = data.resources.map((resource: any) => ({
        id: resource.public_id,
        url: resource.secure_url,
      }));
      setPhotos(fetchedPhotos);
      setError(null);
    } catch (error) {
      console.error("Error fetching photos from Cloudinary:", error);
      setError("Failed to fetch photos. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchPhotosFromCloudinary();
  }, [fetchPhotosFromCloudinary]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setAutoplay(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Itsie le beau dog</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {photos.length > 0 && (
        <Card className="mt-4">
          <CardContent className="mt-4">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={photo.id}>
                    <div className="relative aspect-square">
                      <Image
                        src={photo.url}
                        alt={`Dog photo ${index + 1}`}
                        className="w-full h-full rounded-md object-cover cursor-pointer"
                        onClick={() => openLightbox(index)}
                        fill
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      )}

      {photos.length > 0 && (
        <Card className="mt-4">
          <CardContent className="mt-4">
            <ScrollArea className="pb-4">
              <div className="flex w-max space-x-2.5">
                {photos.map((photo, index) => (
                  <div key={photo.id} className="relative aspect-video w-64">
                    <Image
                      src={photo.url}
                      alt={`Dog photo ${index + 1}`}
                      className="w-full h-full rounded-md object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => openLightbox(index)}
                      width={256}
                      height={144}
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
          setAutoplay(false);
        }}
        index={lightboxIndex}
        slides={photos.map((photo) => ({ src: photo.url }))}
        plugins={[Zoom, Share, Slideshow]}
        slideshow={{ autoplay }}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </div>
  );
};

export default DogPhotoGallery;
