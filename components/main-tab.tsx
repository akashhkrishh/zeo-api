"use client"
 
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs" 
import MyCodeComponent from "./ui/CodeBlock" 

export function MainTabs() {
    const curlCode = `curl --location
    'https://zeoapi.akashhkrishh.in/users/1'`

    const httpsCode = `GET /users/1 HTTP/1.1
Host: zeoapi.akashhkrishh.in`

    const sampleCode = `fetch('https://zeoapi.akashhkrishh.in/users/1')
      .then(response => response.json())
        .then(json => console.log(json))`;
    return (
        <Tabs defaultValue="rest-api" className="w-full aspect-video ">
            <TabsList className="grid w-full grid-cols-3 border ">
                <TabsTrigger value="rest-api" className="py-2.5">REST API</TabsTrigger>
                <TabsTrigger value="curl" className="py-2.5">cURL</TabsTrigger>
                <TabsTrigger value="http" className="py-2.5">HTTP</TabsTrigger>
            </TabsList>
            <TabsContent value="rest-api" className=" overflow-auto  py-4  h-[260px]  bg-black border">
                <MyCodeComponent
                    code={sampleCode}
                    language={"js"}
                    showLineNumbers={true} 
                />
              
            </TabsContent>
            <TabsContent value="curl" className=" overflow-auto  py-4 h-[260px] bg-black border">
                <MyCodeComponent
                    code={curlCode}
                    language={"js"}
                    showLineNumbers={true}
                   
                />
            </TabsContent>
          
            <TabsContent value="http" className=" overflow-auto  py-4 h-[260px]  bg-black border">
                <MyCodeComponent
                    code={httpsCode}
                    language={"js"}
                    showLineNumbers={true} 
                />
            </TabsContent>
          
        </Tabs>
    )
}
