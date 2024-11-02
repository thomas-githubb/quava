import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRandomValues } from "crypto"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import * as React from "react" 
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
 
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function VirtualFridge() {
    const[groceries, setGroceries] = useState(
        [
            {
                name: "Bread",
                key: 1, // UUID
                expiry: "2024-11-14",
                amount: 1,
                unit_s: "loaf",
                unit_p: "loaves"
            },
            {
                name: "Eggs",
                key: 2,
                expiry: "2024-12-01",
                amount: 12,
                unit_s: "egg",
                unit_p: "eggs"
            },
            {
                name: "Milk",
                key: 3,
                expiry: "2024-11-14",
                amount: 1,
                unit_s: "carton",
                unit_p: "cartons"
            },
        ]
    );

    // let groceries = [
    //     {
    //         name: "Bread",
    //         key: 1, // UUID
    //         expiry: "2024-11-14",
    //         amount: 1,
    //         unit_s: "loaf",
    //         unit_p: "loaves"
    //     },
    //     {
    //         name: "Eggs",
    //         key: 2,
    //         expiry: "2024-12-1",
    //         amount: 12,
    //         unit_s: "egg",
    //         unit_p: "eggs"
    //     },
    //     {
    //         name: "Milk",
    //         key: 3,
    //         expiry: "2024-11-14",
    //         amount: 1,
    //         unit_s: "carton",
    //         unit_p: "cartons"
    //     },
    // ]

    

    const addGroc = (name:string, expiry:string, amount:number) => {
        // console.log(groceries);
        
        setGroceries([...groceries, {
            name: name, 
            key: groceries.length+1, 
            expiry: expiry, 
            amount: amount, 
            unit_s: "item", 
            unit_p: "items"
        }])
        // console.log(groceries);

    }

    const removeItem = (remKey:number) => {
        // console.log(groceries);
        // console.log(remKey);
        setGroceries(groceries.filter(groc => (groc.key != remKey)));
        // console.log(groceries);
    }

    const modifyItem = (remKey:number, name2:string, expiry2:string, amount2:number) => {
        // console.log(groceries);
        // console.log(remKey);
        setGroceries(groceries.map((groc) => {
            return (groc.key == remKey ? {
                name: name2, 
                key: groc.key, 
                expiry: expiry2, 
                amount: amount2, 
                unit_s: groc.unit_s, 
                unit_p: groc.unit_p
            } : {
                name: groc.name, 
                key: groc.key, 
                expiry: groc.expiry, 
                amount: groc.amount, 
                unit_s: groc.unit_s, 
                unit_p: groc.unit_p
            })
        }));
        // console.log(groceries);
    }




    const [newItemName, setNewItemName] = useState("Name of Item");
    const [newItemExpiry, setNewItemExpiry] = useState("YYYY-MM-DD");
    const [newItemAmount, setNewItemAmount] = useState(0);
    const [isModifying, setIsModifying] = useState(false);

    const newItem = {
        name: newItemName, 
        expiry: newItemExpiry, 
        amount: newItemAmount
    }

  return (
    <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Item</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead> &emsp; &emsp; &emsp; &emsp; Amount</TableHead>
            <TableHead className="text-right"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-scroll">
            {groceries.map((fStuff) => (
            <TableRow key={fStuff.key}>
                <TableCell className="font-medium">
                    {isModifying ? (
                        <Input
                            id="modGrocName"
                            value={fStuff.name}
                            onChange={(e) => modifyItem(fStuff.key, e.target.value, fStuff.expiry, fStuff.amount)}
                            className="col-span-2 h-8"
                        />) : fStuff.name}
                </TableCell>
                <TableCell>
                    {isModifying ? (
                        <Input
                            id="modGrocExp"
                            value={fStuff.expiry}
                            onChange={(e) => modifyItem(fStuff.key, fStuff.name, e.target.value, fStuff.amount)}
                            className="col-span-2 h-8"
                        />) : fStuff.expiry}
                </TableCell>
                <TableCell>
                    {isModifying ? (
                        <Input
                            id="modGrocAmount"
                            value={fStuff.amount}
                            onChange={(e) => modifyItem(fStuff.key, fStuff.name, fStuff.expiry, e.target.value)}
                            className="col-span-2 h-8"
                        />) : (fStuff.amount + " " + (fStuff.amount != 1 ? fStuff.unit_p: fStuff.unit_s))}
                </TableCell>
                <TableCell>
                <Button 
                    className="px-6 py-3 rounded-lg bg-gray-200 text-[var(--foreground)] font-bold hover:bg-gray-300"
                    onClick={() => setIsModifying(!isModifying)}
                >
                    {isModifying ? "Finish" : "Edit"}
                </Button>
                <Button 
                    className="px-6 py-3 rounded-lg bg-gray-200 text-[var(--foreground)] font-bold hover:bg-gray-300"
                    onClick={(e) => removeItem(fStuff.key)}
                >
                    Remove
                </Button></TableCell>
            </TableRow>
            ))}
        </TableBody>
        <TableFooter>
            {/* <TableRow>
                <TableCell colSpan={3}>Total Groceries</TableCell>
                <TableCell className="text-right">{
                    groceries.map((groc) => {
                        return (groc.amount + " " + (groc.amount > 1 ? groc.unit_p: groc.unit_s) + " ")
                    }).toString()    
                }</TableCell>
            </TableRow> */}
            <TableCell colSpan={2}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Add Groceries</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Add New Item</h4>
                            <p className="text-sm text-muted-foreground">
                            Fill in the details of the item.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width" className="text-xs">Name</Label>
                            <Input
                                id="newGrocName"
                                value={newItem.name}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth" className="text-xs">{"Expiry Date (YYYY-MM-DD)"}</Label>
                            <Input
                                id="newExpiry"
                                value={newItem.expiry}
                                onChange={(e) => setNewItemExpiry(e.target.value)}
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height" className="text-xs">Amount</Label>
                            <Input
                                id="newAmount"
                                value={newItem.amount}
                                onChange={(e) => setNewItemAmount(e.target.value)}
                                className="col-span-2 h-8"
                            />
                            </div>
                            <Button 
                                className="px-6 py-3 rounded-lg bg-gray-200 text-[var(--foreground)] font-bold hover:bg-gray-300"
                                onClick={() => addGroc(newItem.name, newItem.expiry, newItem.amount)}
                            >
                                Add to Fridge
                            </Button>
                        </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </TableCell>
            <TableCell>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Add Items by Barcode</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div>Coming Soon</div>
                    </PopoverContent>
                </Popover>
            </TableCell>
            <TableCell>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Add Items Using Camera</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div>Coming Soon</div>
                    </PopoverContent>
                </Popover>
            </TableCell>

                {/* <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                    <>
                    <div key={tag} className="text-sm">
                        {tag}
                    </div>
                    <Separator className="my-2" />
                    </>
                ))}
                </div> */}
            
        </TableFooter>
    </Table>
  )
}
