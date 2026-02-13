import type { UiSchema } from '@sjsf/form';

export const uiSchema: UiSchema = {
	qr_code: {
		'ui:components': {
			stringField: 'formataQrField'
		}
	},
	checkbox: {
		default: {
			'ui:options': {
				title: 'checkbox'
			}
		},
		error: {
			'ui:options': {
				title: 'checkbox'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	checkboxes: {
		default: {
			'ui:components': {
				arrayField: 'multiEnumField'
			},
			'ui:options': {
				title: 'checkboxes'
			}
		},
		error: {
			'ui:components': {
				arrayField: 'multiEnumField'
			},
			'ui:options': {
				title: 'checkboxes'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	file: {
		default: {
			'ui:components': {
				stringField: 'fileField'
			},
			'ui:options': {
				title: 'file'
			}
		},
		error: {
			'ui:components': {
				stringField: 'fileField'
			},
			'ui:options': {
				title: 'file'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	multiFile: {
		default: {
			'ui:components': {
				arrayField: 'arrayFilesField'
			},
			'ui:options': {
				title: 'multiFile'
			}
		},
		error: {
			'ui:components': {
				arrayField: 'arrayFilesField'
			},
			'ui:options': {
				title: 'multiFile'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	number: {
		default: {
			'ui:options': {
				title: 'number'
			}
		},
		error: {
			'ui:options': {
				title: 'number'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	select: {
		default: {
			'ui:components': {
				stringField: 'enumField'
			},
			'ui:options': {
				title: 'select'
			}
		},
		error: {
			'ui:components': {
				stringField: 'enumField'
			},
			'ui:options': {
				title: 'select'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	text: {
		default: {
			'ui:options': {
				title: 'text'
			}
		},
		error: {
			'ui:options': {
				title: 'text'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	combobox: {
		default: {
			'ui:components': {
				stringField: 'enumField',
				selectWidget: 'comboboxWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'combobox'
			}
		},
		error: {
			'ui:components': {
				stringField: 'enumField',
				selectWidget: 'comboboxWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'combobox'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	datePicker: {
		default: {
			'ui:components': {
				textWidget: 'datePickerWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'datePicker'
			}
		},
		error: {
			'ui:components': {
				textWidget: 'datePickerWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'datePicker'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	dateRangePicker: {
		default: {
			'ui:components': {
				objectField: 'aggregatedField',
				aggregatedWidget: 'dateRangePickerWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'dateRangePicker'
			}
		},
		error: {
			'ui:components': {
				objectField: 'aggregatedField',
				aggregatedWidget: 'dateRangePickerWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'dateRangePicker'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	multiSelect: {
		default: {
			'ui:components': {
				arrayField: 'multiEnumField',
				checkboxesWidget: 'multiSelectWidget'
			},
			'ui:options': {
				useLabel: true,
				title: 'multiSelect'
			}
		},
		error: {
			'ui:components': {
				arrayField: 'multiEnumField',
				checkboxesWidget: 'multiSelectWidget'
			},
			'ui:options': {
				useLabel: true,
				title: 'multiSelect'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	radioButtons: {
		default: {
			'ui:components': {
				stringField: 'enumField',
				selectWidget: 'radioButtonsWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'radioButtons'
			}
		},
		error: {
			'ui:components': {
				stringField: 'enumField',
				selectWidget: 'radioButtonsWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'radioButtons'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	radio: {
		default: {
			'ui:components': {
				stringField: 'enumField',
				selectWidget: 'radioWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'radio'
			}
		},
		error: {
			'ui:components': {
				stringField: 'enumField',
				selectWidget: 'radioWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'radio'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	range: {
		default: {
			'ui:components': {
				numberWidget: 'rangeWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'range'
			}
		},
		error: {
			'ui:components': {
				numberWidget: 'rangeWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'range'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	rangeSlider: {
		default: {
			'ui:components': {
				objectField: 'aggregatedField',
				aggregatedWidget: 'rangeSliderWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'rangeSlider'
			}
		},
		error: {
			'ui:components': {
				objectField: 'aggregatedField',
				aggregatedWidget: 'rangeSliderWidget'
			},
			'ui:options': {
				useLabel: false,
				title: 'rangeSlider'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	switch: {
		default: {
			'ui:components': {
				checkboxWidget: 'switchWidget'
			},
			'ui:options': {
				title: 'switch'
			}
		},
		error: {
			'ui:components': {
				checkboxWidget: 'switchWidget'
			},
			'ui:options': {
				title: 'switch'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	},
	textarea: {
		default: {
			'ui:components': {
				textWidget: 'textareaWidget'
			},
			'ui:options': {
				title: 'textarea'
			}
		},
		error: {
			'ui:components': {
				textWidget: 'textareaWidget'
			},
			'ui:options': {
				title: 'textarea'
			}
		},
		'ui:options': {
			layouts: {
				'object-properties': {
					style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;'
				}
			}
		}
	}
};
