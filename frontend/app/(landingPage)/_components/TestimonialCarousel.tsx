"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function TestimonialCarouselComponent() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <div className="w-full">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className=" rounded-md mx-auto"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/3">
                            <div className="w-fit">
                                <Card>
                                    <CardHeader className="">
                                        <video
                                            controls
                                            className="rounded-lg overflow-hidden w-full"
                                        >
                                            <source
                                                src="https://bouwipdrtccvvmdiyzgr.supabase.co/storage/v1/object/public/umurava_image/Video/Tour%20of%20Umurava%20HUB%20A%20Workspace%20of%20Digital%20Talents%20and%20Companies%20-%20Umurava%20(720p,%20h264).mp4"
                                                type="video/mp4"
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                    </CardHeader>
                                    <CardContent className="flex space-x-2">
                                        <Image
                                            src="/image-6.png"
                                            alt="/image-6.png"
                                            className="bg-primary rounded-full h-10 w-10 object-cover"
                                            height={100}
                                            width={100}
                                        />
                                        <div>
                                            <p className="font-semibold">Manzi Jack</p>
                                            <p className="text-sm text-gray-600">Product Designer, Kigali</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Pagination Dots */}
            <div className="text-center pt-6">
                <div className="flex justify-center space-x-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <div
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full cursor-pointer ${current === index + 1
                                ? "bg-primary" // Use your primary color class here
                                : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
