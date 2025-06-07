use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK");

#[program]
pub mod jokers_arena {
    use super::*;

    pub fn place_bet(ctx: Context<PlaceBet>, amount: u64) -> Result<()> {
        // Verifică dacă utilizatorul are suficienți tokeni
        let user_token_account = &ctx.accounts.user_token_account;
        require!(
            user_token_account.amount >= amount,
            JokersArenaError::InsufficientFunds
        );

        // Transferă tokenii de la utilizator la house
        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: user_token_account.to_account_info(),
                to: ctx.accounts.house_token_account.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        );
        token::transfer(transfer_ctx, amount)?;

        // Generează rezultatul (10% șansă de câștig)
        let is_win = rand::random::<f64>() < 0.1;

        if is_win {
            // Dacă utilizatorul câștigă, transferă tokenii de la house la utilizator
            let transfer_ctx = CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.house_token_account.to_account_info(),
                    to: user_token_account.to_account_info(),
                    authority: ctx.accounts.house.to_account_info(),
                },
            );
            token::transfer(transfer_ctx, amount * 2)?;
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub house: AccountInfo<'info>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub house_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[error_code]
pub enum JokersArenaError {
    #[msg("Insufficient funds")]
    InsufficientFunds,
} 