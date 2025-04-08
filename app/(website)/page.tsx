"use client"

import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, Play } from "lucide-react";
import Image from "next/image";
import Logo from '@/assets/images/zeoapi.svg'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData, setId } from "@/redux/userSlice"; 
import ProfileCard from "@/components/user-profile-card";
import LoadingAnimation from "@/components/loading-animation";
import { useEffect } from "react";

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, id } = useSelector((state: RootState) => state.user)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(fetchData(id));
    }
  };
 
  // Add dispatch as a dependency to the useEffect hook
  useEffect(() => {
    dispatch(fetchData(1));
  }, [dispatch])  // <- Here we added 'dispatch'

  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-8 p-4 flex-1 w-full scroll-smooth">
      <div className="flex flex-col gap-4 items-center justify-center md:py-10 py-4">
        <Image src={Logo} height={80} width={80} alt="" priority />
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-primary">ZEO API</h1>
        <h6 className="text-center">Free and Instant Sample JSON data for developing purpose</h6>
        <div className="flex items-center justify-center gap-4 w-full">
          <Button variant={"outline"} className="md:w-auto w-full h-12" >GitHub<ExternalLinkIcon /></Button>
          <Button variant={"outline"} className="md:w-auto w-full h-12" >Read Docs<ExternalLinkIcon /></Button>
        </div>
      </div>

      <div className="grid w-full lg:grid-cols-2 gap-4">
        <div className="col-span-1 lg:aspect-[6/4] overflow-hidden min-h-[200px] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-sm text-muted-foreground">URL :</h1>
            <Link href={`https://api.akashhkrishh.in/users/${id}`} className="text-primary text-md py-1  rounded-full">
              <Button className=" text-md p-0" variant={"link"}>
                https://api.akashhkrishh.in/users/{id}
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Label className="text-muted-foreground max-md:truncate">Enter any number 1 to 20 : </Label>
            <Input
              onKeyDown={handleKeyPress}
              className="flex-1"
              type="number"
              placeholder="1"
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1 && value < 20) {
                  dispatch(setId(value));
                }
              }}
            />

            <Button onClick={() => { dispatch(fetchData(id)) }} className="ml-2" size={"icon"} variant={"outline"}>
              <Play />
            </Button>
          </div>
          <div className="flex-1 border flex max-w-screen">
            <ProfileCard data={data} isLoading={loading} />
          </div>
        </div>

        <div className="col-span-1 md:aspect-[6/4] overflow-hidden aspect-square flex flex-col">
          <div className="flex items-center py-4 border border-b-0 px-4 gap-2">
            <Label className="text-muted-foreground max-md:truncate">Raw Data </Label>
          </div>
          <div className="border overflow-x-auto overflow-y-auto flex-1">
            {data == null || data.length === 0 && loading ? (
              <LoadingAnimation />
            ) : (
              <pre className="text-muted-foreground p-4">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="grid mt-4 overflow-hidden w-full md:grid-cols-2 gap-4 mb-4">
        <Card className="col-span-1 rounded-none border-none shadow-none p-0">
          <CardHeader className="text-3xl text-primary font-semibold w-full flex flex-col gap-1 px-0">
            <CardTitle>Resources</CardTitle>
            <CardDescription className="text-sm font-normal">ZEO-API comes with a set of 3 common resources:</CardDescription>
          </CardHeader>
          <CardContent className="mt-2 w-full flex flex-col gap-2 p-0">
            <div className="flex items-center">
              <Link className="w-[150px] text-primary italic" href={"/user"}>users/</Link>
              <Label className="text-muted-foreground max-md:truncate">- api.akashhkrishh.in/users</Label>
            </div>
            <div className="flex items-center">
              <Link className="w-[150px] text-primary italic" href={"/user"}>users/:id</Link>
              <Label className="text-muted-foreground max-md:truncate">- api.akashhkrishh.in/users/1</Label>
            </div>
            <div className="flex items-center">
              <Link className="w-[150px] text-primary italic" href={"/user"}>users/images/</Link>
              <Label className="text-muted-foreground max-md:truncate">- api.akashhkrishh.in/users/images</Label>
            </div>
            <div className="flex items-center">
              <Link className="w-[150px] text-primary italic" href={"/user"}>users/:id/images/</Link>
              <Label className="text-muted-foreground max-md:truncate">- api.akashhkrishh.in/users/1/images</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
