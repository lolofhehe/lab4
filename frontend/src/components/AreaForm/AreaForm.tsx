import React from 'react';
import { compose } from 'redux';
import { Panel } from 'primereact/panel';

import { Query } from '../../models/query';

import './AreaForm.css';
import { htmlInputEventExtractor } from '../../utils/htmlInputEventExtractor';
import { customDispatcher } from '../../utils/customDispatcher';

const SLIDER_ZOOM = 1e10;

export interface AreaFormProps {

    locked: boolean;

    x: string | null;
    y: string | null;
    r: string;

    dispatchX: (value: string | null) => void;
    dispatchY: (value: string | null) => void;
    dispatchR: (value: string | null) => void;
    dispatchHistory: (history: Query[]) => void;

    submitQuery(x: string, y: string): void;
}

export class AreaForm extends React.Component<AreaFormProps> {

    private onCheck(event: React.FormEvent) {
        const { x, y, submitQuery } = this.props;

        if (x != null && y != null) {
            submitQuery(x, y);
        }

        event.preventDefault();
    }

    private static replacements: { [key: string]: string } = {
        'minus': '-',
        'zero': '0',
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
        'dot': '.',
        'and': '.'
    };

    private static verify(value: string): string | null {
        value = value.trim();

        if (value.length === 0) {
            return null;
        }

        for (const key in AreaForm.replacements) {
            value = value.toLowerCase().replace(new RegExp(key, 'g'), '' + AreaForm.replacements[key]);
        }

        value = value.split(' ').join('');

        const numeric = +value;
        if (isNaN(numeric)) {
            return null;
        }

        return value;
    }

    private static validate(value: string | null): string | null {
        if (value == null) {
            return null;
        }

        const dotPosition = value.indexOf('.');
        if ((dotPosition >= 0 ? dotPosition : value.length) > 10) {
            return null;
        }

        let preparedValue = value;
        if (dotPosition >= 0) {
            preparedValue = value.substring(0, Math.min(dotPosition + 11, value.length));
        }

        const numeric = +preparedValue;
        if (isNaN(numeric) || numeric <= -5 || numeric >= 3) {
            return null;
        }

        return value;
    }


    render() {
        const { locked, x, y, r, dispatchX, dispatchY, dispatchR } = this.props;

        return (
            <div className="area-form">
                <form onSubmit={this.onCheck.bind(this)}>
                    <div className="form-group max-width">
                        <label>X:&nbsp;</label>
                        <input type="text" data-invalid={x == null} placeholder="(-5, 3)" disabled={locked} onChange=
                            {customDispatcher(htmlInputEventExtractor, dispatchX, compose(AreaForm.validate, AreaForm.verify))} />
                    </div>

                    <div className="form-group max-width">
                        <label>Y:&nbsp;</label>
                        <input type='text' data-invalid={y == null} placeholder="(-5, 3)" disabled={locked} onChange=
                            {customDispatcher(htmlInputEventExtractor, dispatchY, compose(AreaForm.validate, AreaForm.verify))} />
                    </div>

                    <div className="form-group max-width">
                        <label>R:&nbsp;</label>
                        <input type="text" data-invalid={r == null} maxLength={10} placeholder="(-5, 3)" disabled={locked} onChange=
                            {customDispatcher(htmlInputEventExtractor, dispatchR, compose(AreaForm.validate, AreaForm.verify))} />
                    </div>

                    <button id="submit-button" type="submit" disabled={x == null || y == null}>Проверить</button>
                </form>
            </div>
        );
    }
}
