import { profileImage } from "@/Assets";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const ProfileStoryCarousel = () => {
  return (
    <div className="flex justify-center items-center overflow-auto">
      <div className="max-w-[70%] p-10 flex overflow-auto">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
              <CarouselItem key={index} className="basis-1/3 md:basis-1/7">
                <div className="justify-center items-center flex flex-col cursor-pointer">
                  <img
                    src={profileImage}
                    alt="profile-story-carousel"
                    className="border-2 dark:border-blue-200 rounded-[50%] object-cover w-20 h-20 p-1"
                  />
                  <p>VB</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default ProfileStoryCarousel;
