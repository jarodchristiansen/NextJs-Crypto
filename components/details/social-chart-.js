import classes from './social-chart.module.css'
import SocialMetrics from './social-metrics';
import {ButtonGroup, Button, Container} from "react-bootstrap";
import SocialPosts from './social-posts';
import {useState, useEffect} from 'react';
import FinancialChart from './financial/financial-chart';

function SocialChart(props) {
    const {id} = props;

    
    return(
    <div >
{/*    <div className={classes.chartContain}>*/}
{/*        <div className={classes.chartSegment}>*/}
{/*            <SocialMetrics id={id}/>*/}
{/*        </div>*/}
{/*        <div className={classes.chartSegment}>*/}
{/*            <SocialPosts id={id} />*/}
{/*        </div>*/}
{/*    </div>*/}
{/*    <div className={classes.chartContain}>*/}
{/*    <div className={classes.chartSegment}>*/}
{/*        <FinancialChart id={id}/>*/}
{/*    </div>*/}
{/*    <div className={classes.chartSegment}>*/}
{/*    </div>*/}
{/*</div>*/}
        <Container>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", border:"2px solid black", maxWidth: "80%", marginLeft: "10%"}}>
            <ButtonGroup aria-label="Basic example" size={"sm"} style={{maxWidth: "50%"}}>
                <Button variant="primary">Social</Button>
                <Button variant="primary">Financial</Button>
                <Button variant="primary">OnChain</Button>
            </ButtonGroup>


            <SocialMetrics id={id}/>


        </div>
        <div style={{marginRight: "10%"}}>
            <SocialPosts id={id}/>
        </div>


        </Container>

</div>
    )
}


export default SocialChart;