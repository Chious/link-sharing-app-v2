import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/provider";
import ImagePicker from "../image-picker";

export function ProflieForm() {
  const { userInfo, setUserInfo } = useUser();

  return (
    <Card className=" flex-1 p-6 sm:p-8 bg-white border-transparent w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold ">Profile Details</CardTitle>
        <CardDescription className="text-dark-gray">
          Add your details to create a personal touch to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="border-transparent bg-light-gray p-4 flex flex-col gap-4 items-r justify-center">
          <CardDescription className="text-dark-gray text-start w-full">
            Profile picture
          </CardDescription>
          <ImagePicker />
          <CardDescription className="text-dark-gray text-start">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </CardDescription>
        </Card>
        <Card className="border-transparent bg-light-gray p-4 flex flex-col gap-4 items-center justify-center">
          <CardContent className="space-y-4 w-full">
            <div className="space-y-2 w-full">
              <Label htmlFor="username">First name*</Label>
              <Input
                id="username"
                placeholder="e.g. Ben"
                value={userInfo.firstName}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, firstName: e.target.value });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Last name*</Label>
              <Input
                id="password"
                type="password"
                placeholder="e.g. Wright"
                value={userInfo.lastName}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, lastName: e.target.value });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. ben@example.com"
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="flex-1 md:flex-none lg:flex-none bg-dark-purple px-4 text-white w-full md:w-fit lg:w-fit">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
