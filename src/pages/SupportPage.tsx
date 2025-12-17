import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Support Center</h2>
        <p className="text-muted-foreground">Need help? We're here for you.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Form */}
        <Card className="border-none shadow-sm h-fit">
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Send us a message and we'll get back to you asap.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="e.g., System Issue" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Describe your issue..." className="min-h-[150px]" />
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Send Message</Button>
                </form>
            </CardContent>
        </Card>

        {/* FAQ & Direct Contact */}
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <Card className="border-none shadow-sm bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Mail className="h-5 w-5" />
                        </div>
                        <p className="font-semibold text-sm">Email Support</p>
                        <p className="text-xs text-muted-foreground">help@soulparking.com</p>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                        <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                            <Phone className="h-5 w-5" />
                        </div>
                        <p className="font-semibold text-sm">Call Center</p>
                        <p className="text-xs text-muted-foreground text-nowrap">+62 21 555 0199</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                            <AccordionContent>
                                You can reset your password in the Settings page under the Security section.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Where can I download reports?</AccordionTrigger>
                            <AccordionContent>
                                Reports can be downloaded directly from the Dashboard page using the "Download Report" button.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How to update parking rates?</AccordionTrigger>
                            <AccordionContent>
                                Currently, parking rates can only be updated by the super admin via the backend system. Please contact support for assistance.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
