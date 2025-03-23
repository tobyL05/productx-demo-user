import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button"
import { Label } from "./ui/label";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { FormEvent, useState } from "react";

interface FeedbackDialogProps {
    rating: string
}

export default function FeedbackDialog({ rating }: FeedbackDialogProps) {
  const [message, setMessage] = useState('');

  const submit = () => {

  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
    //   onSubmit(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
    if (rating === "up") {
        return (
            <Dialog>
            <DialogTrigger asChild>
                <ThumbsUpIcon className="cursor-pointer w-8 h-8 hover:bg-primary hover:text-primary-foreground p-2 rounded-lg" onClick={() => {}}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>What went well?</DialogTitle>
                <DialogDescription>
                    Any feedback is greatly appreciated!
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="The chatbot answered correctly..."
                className=""
                //   rows={0}
                disabled={!!message}
                />
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        )
    } else {
        return (
            <Dialog>
            <DialogTrigger asChild>
                <ThumbsDownIcon className="cursor-pointer w-8 h-8 hover:bg-primary hover:text-primary-foreground p-2 rounded-lg" onClick={() => {}}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        )
    }
}