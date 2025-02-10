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

export function CarouselComponent() {
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
        <div>
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="bg-light-gray w-full rounded-md mx-auto p-4"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="md:w-2/5">
                                    <Card className="shadow-none border-none">
                                        <CardHeader>
                                            <Image
                                                src="/image-3.png"
                                                alt="image-1"
                                                className="bg-white object-cover text-primary w-12 h-12 p-3 rounded-md"
                                                height={30}
                                                width={30}
                                            />
                                        </CardHeader>
                                        <CardContent className="text-sm text-gray-600">
                                            <p>
                                                The Embedded Finance Platform and Payroll Management Software
                                                Solutions for your organization and Workforce.
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Link className="flex items-center space-x-2" href='#'>
                                                <span className="text-xs text-primary font-bold">Learn more</span>
                                                <MoveRight className="bg-primary w-5 h-5 p-[6px] rounded-full text-white" />
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </div>
                                <Image
                                    src="/image-2.png"
                                    alt="image-1"
                                    className="object-cover h-60 w-80"
                                    height={300}
                                    width={400}
                                />
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
