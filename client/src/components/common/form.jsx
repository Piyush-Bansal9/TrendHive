import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';

function Form({formController, formData, setFormData, buttonText, onSubmit}) {

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
            <div className="flex flex-col gap-6">
                {
                    formController.map((controlItem) => (
                        <div key={controlItem.name} className="grid w-full gap-1.5">
                            <Label className="mb-1">{controlItem.label}</Label>
                            {
                                renderComponentsbyType(controlItem)
                            }
                        </div>
                    ))
                }
                <Button className='w-full mt-2' type="submit">
                {buttonText || "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default Form;