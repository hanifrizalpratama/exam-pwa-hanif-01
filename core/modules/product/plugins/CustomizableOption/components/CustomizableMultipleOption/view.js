import React from 'react';
import CheckBox from '@common_checkbox';
import Typography from '@common_typography';
import classNames from 'classnames';
import useStyles from '@plugin_customizableitem/components/style';

const ViewCustomizableMultipleOption = ({
    title = 'test', data = [], selected = [], disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const styles = useStyles();
    const customClass = classNames('flex flex-col', styles.container, styles.customizableMultipleOption);
    return (
        <div className={customClass}>
            {
                data && data.length > 0 && (
                    <>
                        <Typography variant="label" type="bold" letter="uppercase">
                            {title.replace(/_/g, ' ')}
                            {' '}
                            {required && <Typography color="red" type="bold" variant="label">*</Typography>}
                        </Typography>
                        <CheckBox
                            name={title}
                            label={title}
                            noLabel
                            data={data}
                            value={selected || []}
                            flex="column"
                            onChange={onChange}
                            disabled={disabled}
                        />
                    </>
                )
            }
            {
                error && error !== '' && (
                    <Typography color="red">{error}</Typography>
                )
            }
        </div>
    );
};

export default ViewCustomizableMultipleOption;
