import { useState, useRef, useEffect } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState({ text: '', color: '' });
    const [shiftClass, setShiftClass] = useState('');
    const [isValid, setIsValid] = useState(false);

    const btnRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const isEmpty = username === '' || password === '';
        setIsValid(!isEmpty);

        if (isEmpty) {
            setMsg({ text: 'Please fill the input fields before proceeding', color: 'rgb(218 49 49)' });
        } else {
            setMsg({ text: 'Great! Now you can proceed', color: '#006100ff' });
            setShiftClass('no-shift');
        }
    }, [username, password]);

    const handleMouseOver = () => {
        if (isValid) return;

        const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
        const currentPosIndex = positions.indexOf(shiftClass);
        const nextPos = positions[(currentPosIndex + 1) % positions.length];
        setShiftClass(nextPos);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onLogin();
        }
    };

    return (
        <div className="main-container centered-flex">
            <div className="form-container">
                <div className="icon">
                    <User size={32} />
                </div>
                <form className="centered-flex" onSubmit={handleLogin} style={{ flexDirection: 'column', width: '100%' }}>
                    <div className="title">LOGIN</div>
                    <div className="msg" style={{ color: msg.color }}>{msg.text}</div>

                    <div className="field">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span><User size={16} /></span>
                    </div>

                    <div className="field">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span><Lock size={16} /></span>
                    </div>

                    <div className="action centered-flex">
                        <label htmlFor="remember" className="centered-flex">
                            <input type="checkbox" id="remember" /> Remember me
                        </label>
                        <a href="#">Forget Password ?</a>
                    </div>

                    <div
                        className="btn-container"
                        onMouseOver={handleMouseOver}
                        onTouchStart={handleMouseOver}
                    >
                        <input
                            type="submit"
                            id="login-btn"
                            value="Login"
                            disabled={!isValid}
                            className={shiftClass}
                            ref={btnRef}
                            onMouseOver={handleMouseOver} // Also on the button itself
                        />
                    </div>

                    <div className="signup">
                        Don't have an Account?<a href="#"> Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
