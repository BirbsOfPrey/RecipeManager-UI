import { Box, Typography } from '@mui/material'
import StringResource from '../../resources/StringResource'

export const Copyright = () => {
    return (
        <Box className="copyright__container"
            alignItems="center"
            sx={{ mt: "150px" }}>
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