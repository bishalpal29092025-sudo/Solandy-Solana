use borsh::BorshDeserialize;

#[derive(BorshDeserialize)]
pub struct MovieReviewPayload {
    pub title: String,
    pub rating: u8,
    pub description: String,
}

pub enum MovieInstruction {
    AddMovieReview {
        title: String,
        rating: u8,
        description: String,
    },
}

impl MovieInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, solana_program::program_error::ProgramError> {
        let (&variant, rest) = input.split_first().ok_or(
            solana_program::program_error::ProgramError::InvalidInstructionData,
        )?;

        let payload = MovieReviewPayload::try_from_slice(rest).map_err(|_| {
            solana_program::program_error::ProgramError::InvalidInstructionData
        })?;

        Ok(match variant {
            0 => MovieInstruction::AddMovieReview {
                title: payload.title,
                rating: payload.rating,
                description: payload.description,
            },
            _ => return Err(solana_program::program_error::ProgramError::InvalidInstructionData),
        })
    }
}