import './css/customPage.scss'
import { formatDate, formatMonth, formatTime } from '../utils/utils'
import UnsplashAPIClient from '../services/_unsplashApiService'
import { Button, Card } from 'react-bootstrap'


function SingleCustomPage(props) {

    console.log(props.currentCustomWorkout)


    const showExercises = () => {
        return props.currentCustomWorkout?.exercises?.map((exercise, index) => {
            return (
                <Card className='exercise-card' key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={exercise[2]} />
                    <Card.Body>
                        <Card.Title className='card-title'>{exercise[0]}</Card.Title>
                        <Card.Text className='card-text'>
                            {exercise[1]}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })
    }


    return (

        <>
            <div className='custom-page-container'>
                <h1>{props.currentCustomWorkout.title}</h1>
                <h6>Created by: {" "}
                    <span className='username'>
                        {props.currentCustomWorkout.username}
                    </span>
                </h6>
                <h6>
                    <span className='date'>
                        {formatDate(props.currentCustomWorkout.date)}
                    </span>
                </h6>
                <img className='workout-image' src={props.currentCustomWorkout.image}></img>
                <div className='workout-wrapper'>
                    <h3>1. Warm Up!</h3>
                    A full body warm-up is an essential part of any workout routine. It prepares your muscles, joints, and cardiovascular system for the physical activity to come, reducing the risk of injury and enhancing performance. Here's a step-by-step guide for a comprehensive full body warm-up:
                    <br />
                    <br />
                    <ol>
                        <li>Start with 5-10 minutes of light aerobic exercise, such as jogging in place, jumping jacks, or cycling on a stationary bike. This raises your heart rate, increases blood flow to your muscles, and warms up your cardiovascular system.</li>
                        <li>Next, focus on mobility and dynamic stretching exercises. These movements prepare your joints for the upcoming workout by increasing range of motion, flexibility, and stability. Some examples include:</li>
                        <ul>
                            <li>Arm circles: Stand with your feet hip-width apart and extend your arms straight out to the sides. Make small circles with your arms, gradually increasing the size and speed of the circles.</li>
                            <li>Leg swings: Stand facing a wall or a sturdy object for support. Swing one leg forward and backward, then side to side, keeping it straight and engaging your core. Repeat on the other leg.</li>
                            <li>Butterfly stretch: Sit on the floor with your legs extended in front of you. Bend your knees and bring the soles of your feet together. Gently pull your feet toward your groin, keeping your back straight and your knees bent.</li>
                            <li>Lunges with a twist: Take a big step forward with your right leg and bend both knees to lower into a lunge. Twist your torso to the right, reaching your right arm up and left arm down. Return to the starting position and repeat on the other side.</li>
                        </ul>
                        <li>Finally, perform some static stretching exercises. These movements hold a stretch for 10-30 seconds, increasing flexibility and reducing the risk of injury. Some examples include:</li>
                        <ul>
                            <li>Hamstring stretch: Stand with your feet hip-width apart and bend forward at the waist. Grab your right foot with your right hand and pull it toward your glutes. Hold for 10-30 seconds, then repeat on the other side.</li>
                            <li>Quad stretch: Stand with your feet hip-width apart and bend forward at the waist. Grab your right foot with your left hand and pull it toward your glutes. Hold for 10-30 seconds, then repeat on the other side.</li>
                            <li>Shoulder stretch: Stand with your feet hip-width apart and extend your arms straight out to the sides. Bend your right arm at the elbow and place your right hand on your left shoulder. Gently pull your right arm across your body until you feel a stretch in your left shoulder. Hold for 10-30 seconds, then repeat on the other side.</li>
                            <li>Triceps stretch: Stand with your feet hip-width apart and extend your arms straight out to the sides. Bend your right arm at the elbow and place your right hand on your right shoulder. Gently pull your right arm across your body until you feel a stretch in your right triceps. Hold for 10-30 seconds, then repeat on the other side.</li>
                        </ul>
                    </ol>
                    Remember to listen to your body during the warm-up and modify the exercises if necessary. The full body warm-up should take 10-15 minutes, depending on your fitness level and the intensity of your workout.
                    <br />
                    <br />
                    <hr className='white' />
                    <h3>2. Workout</h3>
                    <div className='exc-wrapper'>
                        <div className='workout-info'>
                            <h4>Sets: {props.currentCustomWorkout.sets}</h4>
                            <h4>Exercises: {props.currentCustomWorkout.exercises.length}</h4>
                        </div>
                        <br />
                        <div className='exercises'>
                            {showExercises()}
                        </div>
                    </div>
                    <br />
                    <hr className='white' />
                    <br />
                    <h3>3. Cool Down...</h3>
                    A cool down is just as important as a warm-up for any workout routine. It allows your heart rate and breathing to gradually return to normal and helps prevent muscle soreness and injury. Here's a step-by-step guide for a comprehensive cool down:
                    <br />
                    <br />
                    <ol>
                        <li>Start with 5-10 minutes of low-intensity aerobic exercise, such as walking or light jogging. This allows your heart rate to gradually decrease and helps to flush out any accumulated waste products in the muscles.</li>
                        <li>Focus on stretching exercises to improve flexibility and reduce muscle tension. Perform each stretch for 15-30 seconds, and avoid bouncing or jerking movements. Some examples include:</li>
                        <ul>
                            <li>Hamstring stretch: Sit on the ground with your legs extended in front of you. Reach forward toward your toes, keeping your back straight and your knees straight.</li>
                            <li>Quad stretch: Stand with your feet hip-width apart. Bend one knee and bring your heel toward your buttock, holding onto your ankle with one hand. Keep your knees together and your torso upright.</li>
                            <li>Shoulder stretch: Stand with your feet hip-width apart. Bring one arm across your chest and use your other arm to gently pull it towards your opposite shoulder. Hold the stretch for 15-30 seconds, then repeat on the other side.</li>

                        </ul>
                        <li>Incorporate some foam rolling or self-massage techniques to release muscle tension and reduce soreness. Use a foam roller or massage ball to target the major muscle groups of your body, focusing on any areas that feel particularly tight or sore.</li>
                        <li>Finally, end the cool down with some deep breathing exercises or relaxation techniques to reduce stress and promote mental relaxation. Sit or lie down in a comfortable position and focus on slow, deep breaths, inhaling through your nose and exhaling through your mouth.</li>
                    </ol>

                </div>

            </div>

        </>
    )
}

export default SingleCustomPage