import { Box, Typography } from '@mui/material'
import StringResource from '../../resources/StringResource'
import './Copyright.css'

export const Copyright = () => {
    return (
        <Box className="copyright__container" alignItems="center" sx={{ mt: 20 }}>
            <Typography
                align="center"
                variant="subtitle1"
                component="p"
                color="primary.main">
                {StringResource.CopyrightHeader}
            </Typography>

            <Typography
                align="center"
                variant="subtitle1"
                component="p"
                color="primary.main">
                {StringResource.Copyright}
            </Typography>
        </Box>
    )
}