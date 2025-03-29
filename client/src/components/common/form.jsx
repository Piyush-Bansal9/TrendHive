const { Label } = require("@radix-ui/react-label");
const { Select, 
        SelectTrigger,
        SelectValue, 
        SelectContent,
        SelectItem} = require("@radix-ui/react-select");
const { Input } = require("postcss");
const { Textarea } = require("../ui/textarea");
const { Button } = require("../ui/button");


function Form({formControlller, formData, setFormData, buttonText, onSubmit}) {

    function renderComponentsbyType(controlItem) {
        let element = null;
        const value = formData[controlItem.name] || "";

        switch (controlItem.componentType) {
            case "input":
                element = (
                    <Input
                    value={value}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    name={controlItem.name}
                    id={controlItem.name}
                    onChange={(event) => 
                        setFormData({
                            ...formData,
                            [controlItem.name] : event.target.value
                        })
                    }
                    />
                )
                break;
            case "select":
                element = (
                    <Select value={value} onValueChange={(value) => {
                        setFormData({
                            ...formData,
                            [controlItem.name] : value
                        })
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder={controlItem.placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                            {controlItem.options && controlItem.options.length > 0 ? 
                                controlItem.options.map((optionItem) => (
                                    <SelectItem value={optionItem.value}>{optionItem.label}</SelectItem>
                                )) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;
            case "textarea":
                element = (
                    <Textarea
                    value={value}
                    onChange={(event) => 
                        setFormData({
                            ...formData,
                            [controlItem.name] : event.target.value
                        })
                    }
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    />
                )
                break;
            default:
                element = (
                    <Input
                    value={value}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    name={controlItem.name}
                    id={controlItem.name}
                    onChange={(event) => 
                        setFormData({
                            ...formData,
                            [controlItem.name] : event.target.value
                        })
                    }
                    />
                )
                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControlller.map((controlItem) => (
                        <div className="flex gap-1">
                            <Label>{controlItem.map}</Label>
                            {
                                renderComponentsbyType(controlItem)
                            }
                        </div>
                    ))
                }
            </div>
            <Button className='w-full mt-2' type="submit">
                {buttonText || "Submit"}
            </Button>
        </form>
    )
}