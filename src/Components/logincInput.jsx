//const styles = StyleSheet.create({

//});

const Button = (props) => {
    return (
        <div>
            <label>
                {props.buttonTitle}
                <input type="text" value={props.buttonText} {...props}/>
            </label>
        </div>
    );
};

export default Button;