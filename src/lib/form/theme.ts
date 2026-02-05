import { setThemeContext } from '@sjsf/shadcn4-theme';

import { Button } from '$lib/shadcn/ui/button/index.js';
import { Checkbox } from '$lib/shadcn/ui/checkbox/index.js';
import { Input } from '$lib/shadcn/ui/input/index.js';
import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/shadcn/ui/select/index.js';
import { Textarea } from '$lib/shadcn/ui/textarea/index.js';
import { RadioGroup, RadioGroupItem } from '$lib/shadcn/ui/radio-group/index.js';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '$lib/shadcn/ui/command/index.js';
import { Calendar } from '$lib/shadcn/ui/calendar/index.js';
import { ToggleGroup, ToggleGroupItem } from '$lib/shadcn/ui/toggle-group/index.js';
import { Slider } from '$lib/shadcn/ui/slider/index.js';
import { Switch } from '$lib/shadcn/ui/switch/index.js';
import { Popover, PopoverContent, PopoverTrigger } from '$lib/shadcn/ui/popover/index.js';
import {
	Field,
	FieldLabel,
	FieldError,
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldTitle,
	FieldSet
} from '$lib/shadcn/ui/field/index.js';
import { ButtonGroup } from '$lib/shadcn/ui/button-group/index.js';
import { RangeCalendar } from '$lib/shadcn/ui/range-calendar/index.js';

// Used by default in the following fields: multiEnumField
import '@sjsf/shadcn4-theme/extra-widgets/checkboxes-include';
import '@sjsf/shadcn4-theme/extra-widgets/combobox-include';
import '@sjsf/shadcn4-theme/extra-widgets/date-picker-include';
import '@sjsf/shadcn4-theme/extra-widgets/date-range-picker-include';
// Used by default in the following fields: fileField, filesField
import '@sjsf/shadcn4-theme/extra-widgets/file-include';
import '@sjsf/shadcn4-theme/extra-widgets/multi-select-include';
import '@sjsf/shadcn4-theme/extra-widgets/radio-buttons-include';
import '@sjsf/shadcn4-theme/extra-widgets/radio-include';
import '@sjsf/shadcn4-theme/extra-widgets/range-slider-include';
import '@sjsf/shadcn4-theme/extra-widgets/range-include';
import '@sjsf/shadcn4-theme/extra-widgets/switch-include';
import '@sjsf/shadcn4-theme/extra-widgets/textarea-include';

export function setShadcnThemeContext() {
	setThemeContext({
		components: {
			ButtonGroup,
			Field,
			FieldLabel,
			FieldError,
			FieldDescription,
			FieldGroup,
			FieldLegend,
			FieldTitle,
			FieldSet,
			Button,
			Checkbox,
			Input,
			Select,
			SelectContent,
			SelectItem,
			SelectTrigger,
			Textarea,
			RadioGroup,
			RadioGroupItem,
			// @ts-expect-error - Can be safely ignored
			Command,
			CommandEmpty,
			CommandGroup,
			CommandInput,
			CommandItem,
			CommandList,
			Calendar,
			ToggleGroup,
			ToggleGroupItem,
			Slider,
			Switch,
			Popover,
			PopoverContent,
			PopoverTrigger,
			RangeCalendar
		}
	});
}
